export default async (req) => {
  const u = new URL(req.url);
  const target = u.searchParams.get("url");
  if (!target) return new Response("missing url", {status:400});
  try {
    const r = await fetch(target, {redirect:"follow"});
    const body = await r.arrayBuffer();
    const h = {};
    const keep = ["content-type","content-length"];
    keep.forEach(k=>{ const v = r.headers.get(k); if(v) h[k]=v; });
    h["access-control-allow-origin"] = "*";
    return new Response(body, {status:r.status, headers:h});
  } catch(e) { return new Response("proxy error: "+e.message, {status:502}); }
};
