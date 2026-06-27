// ═══════════════════════════════════════════════════════════════
//  CHECK-ACCESS — Verifica se o e-mail está na whitelist
//  Edite a lista ALLOWED_EMAILS para controlar o acesso
// ═══════════════════════════════════════════════════════════════

// ↓↓↓ ADICIONE AQUI OS E-MAILS AUTORIZADOS ↓↓↓
const ALLOWED_EMAILS = [
  'rauvideos2016@gmail.com',   // Seu próprio e-mail (admin)
  // 'cliente1@gmail.com',     // Adicione clientes aqui
  // 'cliente2@gmail.com',
];
// ↑↑↑ FIM DA LISTA ↑↑↑

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Método não permitido' }) };

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, headers, body: JSON.stringify({ error: 'JSON inválido' }) }; }

  const { email } = body;
  if (!email) return { statusCode: 400, headers, body: JSON.stringify({ error: 'E-mail não informado' }) };

  const allowed = ALLOWED_EMAILS.map(e => e.toLowerCase().trim()).includes(email.toLowerCase().trim());

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ allowed })
  };
};
