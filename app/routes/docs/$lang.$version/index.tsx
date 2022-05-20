import invariant from "ts-invariant";
import { LoaderFunction } from "@remix-run/node";

import { json } from "@remix-run/node";

import { getDoc } from "~/utils/docs/get-doc.server";
import { DocsPage } from "~/components/doc";
import { CACHE_CONTROL } from "~/utils/http.server";

let loader: LoaderFunction = async ({ params }) => {
  invariant(!!params.version, "Expected version param");
  invariant(!!params.lang, "Expected language param");

  let { lang, version } = params;

  let doc = await getDoc("index", version, lang);

  return json(doc, { headers: { "Cache-Control": CACHE_CONTROL } });
};

function SplatPage() {
  return <DocsPage />;
}

export default SplatPage;
export { loader };
export { meta } from "~/components/doc";
