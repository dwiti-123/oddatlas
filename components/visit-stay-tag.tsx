export function VisitStayTag({stay,className=''}:{stay:boolean;className?:string}) {
 return <span className={`stay-tag ${stay?'stay':''} ${className}`}>{stay?'You can stay here':'Visit only'}</span>;
}
