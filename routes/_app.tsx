import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>kondate-deno</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      {/* 背景色はグラデーションを使った、食欲のそそる色。薄い色 */}
      <body class="bg-zinc-50">
        <Component />
      </body>
    </html>
  );
}
