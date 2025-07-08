function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
              <svg
                viewBox="0 0 24 24"
                className="w-12 h-12 text-white"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            This Application is
          </h1>

          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full text-xl md:text-2xl font-semibold shadow-lg mb-8">
            <span className="mr-3">⚙️</span>
            Kubernetes Deployment
          </div>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            This React application is containerized and deployed using
            Kubernetes orchestration platform, providing scalable and resilient
            cloud-native deployment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-white font-semibold mb-2">Scalable</h3>
              <p className="text-gray-400 text-sm">
                Auto-scaling capabilities with Kubernetes pods
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-white font-semibold mb-2">Secure</h3>
              <p className="text-gray-400 text-sm">
                Built-in security features and network policies
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-white font-semibold mb-2">Resilient</h3>
              <p className="text-gray-400 text-sm">
                Self-healing and fault-tolerant deployment
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center bg-green-500/20 text-green-400 px-4 py-2 rounded-full border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">
                Deployment Status: Running
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Powered by React + Vite + Tailwind CSS | Deployed with Kubernetes
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
