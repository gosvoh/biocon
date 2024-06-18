import Script from "next/script";
import AntdConfigProvider from "./providers/ant.config.provider";
import Image from "next/image";
import logo from "$/public/logo.jpg";

export default function Home() {
  return (
    <AntdConfigProvider>
      <main>
        <h1>BIOCON 2024</h1>
        <h2>Updates very soon!</h2>
      </main>
      <Image
        src={logo}
        alt="BIOCON 2024 logo"
        className="h-screen object-cover blur-md absolute inset-0 -z-10 opacity-50"
      />
      <Script id="yandex-metrika">{`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(94808565, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        });
      `}</Script>
    </AntdConfigProvider>
  );
}
