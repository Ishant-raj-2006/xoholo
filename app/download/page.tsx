import Link from 'next/link'

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[#0f1117] p-4 text-slate-100 sm:p-8">
      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl" />
        <div className="absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="w-full max-w-2xl space-y-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-glow">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">Mobile access</p>
            <h1 className="text-4xl font-semibold text-white">Download Xholo for your phone</h1>
            <p className="text-sm text-slate-400">Get the mobile dashboard to manage subscriptions, renewals, and spending on the go.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <a href="/xholo-mobile-app.apk" download className="flex items-center justify-center gap-3 rounded-3xl bg-brand-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-brand-300">
              Download Android APK
            </a>
            <button disabled className="flex items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-slate-300 transition">
              iOS coming soon
            </button>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-slate-300 shadow-soft">
            <p className="text-sm font-semibold text-white">Need help?</p>
            <p className="mt-3 text-sm leading-6">If you want to use Xholo on mobile, download the APK for quick access or sign in with your account to sync your dashboard settings.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/login" className="rounded-3xl bg-white/10 px-5 py-3 text-sm text-slate-100 transition hover:bg-white/20">
              Go to Login
            </Link>
            <Link href="/signup" className="rounded-3xl border border-white/10 px-5 py-3 text-sm text-white transition hover:border-brand-300/70">
              Register an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
