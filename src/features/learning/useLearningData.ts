import { useEffect, useState } from 'react';
export function useLearningData() {
 const [,update]=useState(0);
 useEffect(()=>{const refresh=()=>update(v=>v+1);window.addEventListener('quant-learning-change',refresh);window.addEventListener('storage',refresh);return ()=>{window.removeEventListener('quant-learning-change',refresh);window.removeEventListener('storage',refresh);};},[]);
}
