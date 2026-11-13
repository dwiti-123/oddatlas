'use client';

export function StoryJump() {
 return <a href="#full-story-text" onClick={()=>{
  const story=document.getElementById('full-story');
  if(story instanceof HTMLDetailsElement) story.open=true;
 }}>Read the story ↓</a>;
}
