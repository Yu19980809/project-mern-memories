#server
1. mkdir server -> cd server -> npm init -y
2. npm i ...
3. touch index.js ( init app, import routes, connect mongodb, start server )
4. Router
5. Models
6. Controllers

#client
1. mkdir client -> npm i vite@latest ./
2. npm i ... --legacy-peer-deps
3. App.jsx (BrowserRouter, Routes, Route)
4. styles.js (hold all css code)
5. Redux ( store, reducers )
6. api ( axios )
7. GoogleLogin( gapi ), logout
8. middleware for auth
9. API.interceptors.request.use()
10. check token expired( expired -> logout )
11. pagination
12. search
13. loading
14. PostDetail( Recommendation, Comments )
15. like/unlike adjust ( setLikes and send request, no waiting )

#deploy
1. render for server
2. vercel for client