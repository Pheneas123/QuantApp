import test from 'node:test';
import assert from 'node:assert/strict';
import { questions } from '../src/features/quick-practice/data/questions.ts';

const question = (id: string) => {
  const q = questions.find(q => q.id === id);
  assert.ok(q, id);
  return q;
};
const close = (a: number, b: number) => Math.abs(a - b) < 1e-8;
const plain = (answer: string) => answer.replaceAll('$', '').replaceAll('\\', '');
// Explicit formula maps tie the checks to the actual choice text, not just an index.
// These checks do not prove correctness of the conceptual questions.
function check(id: string, values: Record<string, number>, expected: number) {
  const q = question(id);
  const matches = q.answers.map((answer, i) => {
    assert.ok(Object.hasOwn(values, plain(answer)), id + ': unreviewed formula ' + answer);
    return close(values[plain(answer)], expected) ? i : -1;
  }).filter(i => i !== -1);
  assert.deepEqual(matches, [q.correctAnswer], id);
}

test('current bank has explanations and does not reuse the retired numeric variant ID', () => {
  assert.ok(questions.every(q => q.explanation?.trim()));
  assert.ok(!questions.some(q => q.id === 'calc-005'));
});

test('numeric probabilities and conditional mean agree with elementary calculations', () => {
  check('prob-001', Object.fromEntries(question('prob-001').answers.map(a => [a, Number(a)])), 0.4*0.5);
  const evens = [1,2,3,4,5,6].filter(n => n%2===0);
  const fractions = Object.fromEntries(question('prob-002').answers.map(a => {
    const [n,d] = plain(a).split('/').map(Number);
    return [plain(a),n/d];
  }));
  check('prob-002', fractions, evens.filter(n=>n>3).length/evens.length);
  check('calc-004', Object.fromEntries(question('calc-004').answers.map(a => [a,Number(a)])), 1.3+0);
});

test('sample mean expectation and variance checked by enumerating a Bernoulli sample', () => {
  const n=3, p=0.3;
  let mean=0, second=0;
  for(let bits=0;bits<2**n;bits++){
    const successes=bits.toString(2).replaceAll('0','').length;
    const mass=p**successes*(1-p)**(n-successes);
    mean+=mass*successes/n;
    second+=mass*(successes/n)**2;
  }
  check('stat-001', {'nmu':n*p,'mu/n':p/n,'0':0,'mu':p},mean);
  const variance=p*(1-p);
  check('stat-002', {
    'sigma^2/n':variance/n,'sigma^2':variance,'nsigma^2':n*variance,'sigma/sqrt n':Math.sqrt(variance/n),
  },second-mean**2);
});

test('transformed uniform CDF and Poisson mean checked from their probability laws', () => {
  const y=1.7;
  check('prob-012', {
    'e^{-y}':Math.exp(-y),'1-e^{-y}':1-Math.exp(-y),
    '1-e^{-y^2}':1-Math.exp(-y*y),'1-e^{-y/2}':1-Math.exp(-y/2),
  },1-Math.exp(-y)); // Length of the uniform interval [exp(-y),1].
  const rate=2.3,t=1.8,a=rate*t;
  let mass=Math.exp(-a),mean=0;
  for(let k=1;k<100;k++){mass*=a/k;mean+=k*mass;}
  check('process-001', {'lambda':rate,'lambda t':rate*t,'t/lambda':t/rate,'lambda t^2':rate*t*t},mean);
});

test('exponential MLE solves the score equation with negative second derivative', () => {
  const sample=[0.3,0.8,1.4,2.2],n=sample.length,sum=sample.reduce((a,b)=>a+b,0);
  const rates:Record<string,number>={'S/n':sum/n,'1/S':1/sum,'n/S':n/sum,'S':sum};
  const q=question('stat-009');
  assert.deepEqual(q.answers.map((a,i)=>close(n/rates[plain(a)]-sum,0)?i:-1).filter(i=>i!==-1),[q.correctAnswer]);
  assert.ok(-n/rates[plain(q.answers[q.correctAnswer])]**2<0);
});

test('beta posterior shapes follow multiplication of prior and likelihood kernels', () => {
  const a=2,b=3,s=2,n=7;
  const shapes:Record<string,[number,number]>={
    'operatorname{Beta}(a+n,b+s)':[a+n,b+s],
    'operatorname{Beta}(a+n-s,b+s)':[a+n-s,b+s],
    'operatorname{Beta}(a+s,b+n)':[a+s,b+n],
    'operatorname{Beta}(a+s,b+n-s)':[a+s,b+n-s],
  };
  const q=question('stat-014');
  for(const p of [0.2,0.4,0.7]){
    const kernel=p**(a-1)*(1-p)**(b-1)*p**s*(1-p)**(n-s);
    const matches=q.answers.map((answer,i)=>{
      const [alpha,beta]=shapes[plain(answer)];
      return Math.abs(p**(alpha-1)*(1-p)**(beta-1)-kernel)<1e-12?i:-1;
    }).filter(i=>i!==-1);
    assert.deepEqual(matches,[q.correctAnswer]);
  }
});

test('geometric Brownian exponential drift and OU mean satisfy the stated equations', () => {
  const mu=0.2,sigma=0.7;
  const drifts:Record<string,number>={
    'X_t=xexp(mu t+sigma W_t)':mu,
    'X_t=xexp((mu+tfrac12sigma^2)t+sigma W_t)':mu+0.5*sigma**2,
    'X_t=xexp((mu-tfrac12sigma)t+sigma W_t)':mu-0.5*sigma,
    'X_t=xexp((mu-tfrac12sigma^2)t+sigma W_t)':mu-0.5*sigma**2,
  };
  const gbm=question('calc-014');
  assert.deepEqual(gbm.answers.filter(a=>close(drifts[plain(a)]+0.5*sigma**2,mu)),[gbm.answers[gbm.correctAnswer]]);
  const x=1.7,theta=2.1,kappa=0.8;
  const formulas:Record<string,(t:number)=>number>={
    'theta+(x-theta)e^{-kappa t}':t=>theta+(x-theta)*Math.exp(-kappa*t),
    'x+kappatheta t':t=>x+kappa*theta*t,
    'theta+(x-theta)e^{kappa t}':t=>theta+(x-theta)*Math.exp(kappa*t),
    'xe^{-kappa t}':t=>x*Math.exp(-kappa*t),
  };
  const ou=question('calc-015'),h=1e-5;
  assert.deepEqual(ou.answers.filter(a=>{
    const f=formulas[plain(a)];
    return close(f(0),x)&&[0.3,1,2].every(t=>close((f(t+h)-f(t-h))/(2*h),kappa*(theta-f(t))));
  }),[ou.answers[ou.correctAnswer]]);
});
