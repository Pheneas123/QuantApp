import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import cpp from 'highlight.js/lib/languages/cpp';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('python',python);
hljs.registerLanguage('cpp',cpp);
hljs.registerLanguage('javascript',javascript);
hljs.registerLanguage('typescript',typescript);
const aliases:Record<string,string>={py:'python',python:'python','c++':'cpp',cpp:'cpp',js:'javascript',javascript:'javascript',ts:'typescript',typescript:'typescript'};
export function highlight(code:string,language?:string):string|undefined {
 const name=aliases[language?.toLowerCase()??''];if(!name)return undefined;
 return hljs.highlight(code,{language:name,ignoreIllegals:true}).value;
}
