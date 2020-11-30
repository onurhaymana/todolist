import '../styles/globals.css'
import '../styles/todo.css'

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
