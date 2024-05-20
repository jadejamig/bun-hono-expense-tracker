import app from './app'

Bun.serve({
  fetch: app.fetch
});

const func = async () => {
    const response = await fetch('http://localhost:3000')
}
