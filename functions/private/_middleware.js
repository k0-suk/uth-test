export async function onRequest(context) {
  const page = await context.next();
  const myUser = "testuser";
  const myPass = "testpass";
  const unauthorizedResponse = new Response('Password Required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
  });
  const authHeader = page.headers.get('Authorization');
  if (!authHeader) return unauthorizedResponse;
  const [user, pass] = atob(authHeader.split(' ')[1]).split(':');
  if (user === myUser && pass === myPass) return page;
  return unauthorizedResponse;
}
