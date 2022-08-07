import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>Dev Shah</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Ask something from AI</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Example : Write a tagline for a gym"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Blow my mind" />
        </form>
        <h4>It may take upto 10s to process</h4>
        <h4 style={{textAlign:'center'}}>Example : Write a conversation between Elon Musk and Sundar Pichai 
        : Elon Musk: Hi, Sundar. Sundar Pichai: Hi, Elon. How are you doing? Elon Musk: I'm doing well.
         How are you? Sundar Pichai: I'm doing well, working on some initiatives in India.</h4>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
