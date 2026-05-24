type ServiceLogoProps = {
  name: string
  accent?: string
}

export function ServiceLogo({ name, accent }: ServiceLogoProps) {
  switch (name) {
    case 'Netflix':
      return (
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#E50914]/10 text-[#E50914] shadow-glow">
          <span className="text-2xl font-black">N</span>
        </div>
      )
    case 'Spotify':
      return (
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#1DB954]/10 text-[#1DB954] shadow-glow">
          <svg viewBox="0 0 168 168" className="h-8 w-8 fill-current" aria-hidden="true">
            <path d="M84 0a84 84 0 1084 84A84 84 0 0084 0zm39.3 122.5c-2.4 3.6-7.6 4.8-11.1 2.4-30.4-20.8-68.9-25.5-114.1-13.8-4.3 1.1-8.8-1.4-9.9-5.8s1.4-8.8 5.8-9.9c49.1-12.2 92.3-6.4 127.6 15.2 3.6 2.4 4.8 7.6 2.4 11.1zM125.8 96.4c-2.9 4.3-8.9 5.7-13.2 2.8-27.5-18.4-69.6-23.7-102.5-12.8-5.1 1.7-10.6-.9-12.3-6s.9-10.6 6-12.3c38.6-12.9 84.6-7.1 116.4 14.6 4.3 2.9 5.7 8.9 2.8 13.2zm8.5-23.5c-34-22.1-90.2-24.1-123-13-6 2.1-12.6-.9-14.7-6.9s.9-12.6 6.9-14.7c37.8-13.4 99.5-11.2 138.4 14 5 3.3 6.5 10.1 3.2 15.1-3.3 5.1-10.1 6.5-15.1 3.2z" />
          </svg>
        </div>
      )
    case 'YouTube Premium':
      return (
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FF0000]/10 text-[#FF0000] shadow-glow">
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
            <path d="M23 7.2a3 3 0 00-2.1-2.1C18.4 4.5 12 4.5 12 4.5s-6.4 0-8.9.6A3 3 0 00.9 7.2 31.1 31.1 0 000 12a31.1 31.1 0 00.9 4.8 3 3 0 002.1 2.1c2.5.6 8.9.6 8.9.6s6.4 0 8.9-.6a3 3 0 002.1-2.1A31.1 31.1 0 0024 12a31.1 31.1 0 00-.9-4.8zM9.8 15.5V8.5L16.8 12l-7 3.5z" />
          </svg>
        </div>
      )
    case 'Adobe Creative':
      return (
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FF0000]/10 text-[#FF0000] shadow-glow">
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
            <path d="M3 21h18L12 3 3 21zm12.4-3h-2.2l-1.3-3.7-1.3 3.7H8.4L12 7.5l3.4 10.5z" />
          </svg>
        </div>
      )
    case 'Notion':
      return (
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900/80 text-white shadow-glow">
          <svg viewBox="0 0 64 64" className="h-8 w-8 fill-current" aria-hidden="true">
            <path d="M15 8h34c3.3 0 6 2.7 6 6v36c0 3.3-2.7 6-6 6H15c-3.3 0-6-2.7-6-6V14c0-3.3 2.7-6 6-6zm7.4 9.5l10.2 20.2 10.2-20.2H22.4zm1.1 2.8h16.9L32 34.6 23.5 20.3zm-1.6 23.5h18V33.5l-9 17.7-9-17.7v10.3z" />
          </svg>
        </div>
      )
    default:
      return (
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 text-white shadow-glow" style={{ backgroundColor: accent ? `${accent}22` : undefined }}>
          <span className="text-xl font-semibold">{name.charAt(0)}</span>
        </div>
      )
  }
}
