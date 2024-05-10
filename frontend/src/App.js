import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

const baseURL = "https://fake-or-news-73580b2dee76.herokuapp.com/";

function App() { 

  const [text, setText] = useState('');
  const [result, setResult] = useState("");
  const [bgColor, setBgColor] =useState();

  const selectBgColor = (textResult) => {
    if (textResult.includes("Fake")){
      console.log("ENTREI NA FAKE", textResult=="Fake ")
      setBgColor("bg-red-300")
      return
    }
    if (textResult.includes("News")){
      setBgColor("bg-green-300")
      return
    }
    if (textResult.includes("Opinião")){
      setBgColor("bg-yellow-300")
      return
    }
  }

  const sendToFakeOrNews= () => {
    axios
    .post(baseURL, {
      text
    })
    .then((response) => {
      setResult(response.data.message);
      selectBgColor(response.data.message);
    });
  }

  useEffect(() => {
    //selectBgColor(result);
  }, [result]);
  return (
    <div className="App">
      <SpeedInsights/>
      <Analytics/>
      <div class="bg-gray-900">
        <div class="mx-auto max-w-6xl pt-0 pb-24 sm:px-6 md:py-24 lg:px-8">
          <div class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16  shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg viewBox="0 0 1024 1024" class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
              <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stop-color="#7775D6" />
                  <stop offset="1" stop-color="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Fake Or News.</h2>
              <p class="mt-6 text-lg leading-8 text-gray-300">Sabe aquela mensagem no zap que você recebeu ou aquele tweet com informações estranhas. Verifique aqui se é uma fake ou uma news.</p>
            </div>
            <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <div class="col-span-full text-white">
                  <div class="mt-2">
                    <textarea value={text} onChange={e => setText(e.target.value)} id="about" name="about" rows="6" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                  </div>
              </div>
              <div class="mt-6 mb-8 flex items-center justify-end gap-x-6">
                <button type="button" class="text-sm font-semibold leading-6 text-white">Limpar</button>
                <button type="submit" onClick={sendToFakeOrNews} class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Verificar</button>
              </div>
            </div>
           
          </div>
          { result =="" || text =="" ? <div></div>:
          <div class={`max-w-md mx-auto mt-3 p-4 ${bgColor} rounded-lg`}>
            <h3 class="font-bold">{result}</h3>
            <p>Mensagem verificada</p>
          </div> 
          }
        </div>
      </div>
    </div>
  );
}

export default App;
