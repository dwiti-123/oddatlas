// Local integration check: requires Playwright, installed Edge and a preview on port 5194
// with NEXT_PUBLIC_POSTHOG_KEY=phc_local_test_only and NEXT_PUBLIC_POSTHOG_HOST=https://posthog.test.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const zlib = require('node:zlib');
const fs = require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'});
 await context.addInitScript(()=>Object.defineProperty(navigator,'webdriver',{get:()=>false}));
 const calls=[], events=[], errors=[];
 await context.route(/^https:\/\/([^/]*\.)?posthog\.test\//,async route=>{
  const req=route.request(); calls.push(req.url());
  const buf=req.postDataBuffer();
  if(buf){
   let raw=buf.toString();
   try { if(buf[0]===31 && buf[1]===139) raw=zlib.gunzipSync(buf).toString(); else if(raw.startsWith('data=')) raw=Buffer.from(new URLSearchParams(raw).get('data'),'base64').toString();
    const data=JSON.parse(raw); events.push(...(Array.isArray(data)?data:data.batch||[data]));
   } catch { errors.push('Could not decode '+req.url()+' prefix '+buf.subarray(0,90).toString()+' type '+req.headers()['content-type']); }
  }
  await route.fulfill({status:200,contentType:'application/json',body:'{}'});
 });
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5194/places/hashima?name=PRIVATE_LIST&places=hashima&utm_source=qa',{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Allow analytics',exact:true}).waitFor();
 if(calls.length) throw Error('PostHog requested before consent');
 await page.screenshot({path:'docs/research/posthog-consent-desktop-2026-10-27.png'});
 await page.getByRole('button',{name:'No thanks',exact:true}).click();
 await page.reload({waitUntil:'networkidle'});
 if(calls.length) throw Error('PostHog requested after rejection');
 await page.getByRole('button',{name:'Analytics preferences',exact:true}).click();
 await page.getByRole('button',{name:'Allow analytics',exact:true}).click();
 await page.waitForTimeout(2000); await page.locator('#full-story summary').click();
 await page.getByRole('button',{name:'Choose lists for Hashima',exact:true}).click();
 await page.locator('input[name="name"]').fill('PRIVATE_LIST');
 await page.getByRole('button',{name:'Create & save',exact:true}).click();
 await page.keyboard.press('Escape');
 await page.locator('a[href="/blog/how-to-visit-hashima-island"]').first().click();
 await page.waitForURL('**/blog/how-to-visit-hashima-island');
 await page.locator('a[href="/places/hashima"]').first().click();
 await page.waitForURL('**/places/hashima');
 const source=page.locator('a[href^="https://"]:visible').first();
 await source.evaluate(a=>a.addEventListener('click',event=>event.preventDefault(),{once:true}));
 await source.click();
 await page.waitForTimeout(5000);
 const names=events.map(e=>e.event);
 for(const name of ['$pageview','place_saved','full_story_opened','blog_place_clicked','external_source_clicked']) if(!names.includes(name)) throw Error('Missing '+name+' got '+names+' calls '+JSON.stringify(calls)+' decode '+JSON.stringify(errors));
 if(JSON.stringify(events).includes('PRIVATE_LIST')) throw Error('Private list leaked');
 if(events.filter(e=>e.event==='$pageview').length!==3) throw Error('Duplicate or missing pageviews '+names);
 await page.getByRole('button',{name:'Analytics preferences',exact:true}).click();
 await page.getByRole('button',{name:'No thanks',exact:true}).click();
 await page.waitForTimeout(1000);const stopped=calls.length;
 await page.reload({waitUntil:'networkidle'});
 if(calls.length!==stopped) throw Error('Requests after withdrawal');
 const dnt=await browser.newContext();let dntCalls=0;
 await dnt.addInitScript(()=>Object.defineProperty(navigator,'doNotTrack',{get:()=> '1'}));
 await dnt.route(/^https:\/\/([^/]*\.)?posthog\.test\//,route=>{dntCalls++;return route.abort()});
 const dp=await dnt.newPage();await dp.goto('http://127.0.0.1:5194/places/hashima',{waitUntil:'networkidle'});
 if(dntCalls) throw Error('DNT not respected');await dnt.close();
 const mobile=await browser.newContext({viewport:{width:390,height:844}});
 const mp=await mobile.newPage();await mp.goto('http://127.0.0.1:5194/places/hashima',{waitUntil:'networkidle'});
 await mp.getByRole('button',{name:'Allow analytics',exact:true}).waitFor();
 if(await mp.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw Error('Mobile overflow');
 await mp.screenshot({path:'docs/research/posthog-consent-mobile-2026-10-27.png'});
 fs.writeFileSync('docs/research/posthog-checks-2026-10-27.json',JSON.stringify({events:names,requests:calls.length,errors,privacy:'No private list content in captured payloads',checks:['no requests before consent','no requests after rejection or withdrawal','three pageviews for three navigations','save and story events','blog to place click','mobile no overflow','external source click','Do Not Track']},null,2));
 console.log(JSON.stringify({events:names,errors}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});



