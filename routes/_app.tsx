import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>kondate-deno</title>
        <link rel="stylesheet" href="https://neat.joeldare.com/neat.css" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="flex flex-col">
        <Component />
      </body>
    </html>
  );
}
