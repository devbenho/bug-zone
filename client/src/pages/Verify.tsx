import { Button } from '../components/Button'

export const Verify: React.FC<{ username: string; email: string }> = ({ username, email }) => {
  return (
    // Page
    <div className="bg-[#042631] h-screen w-full flex flex-col justify-center items-center text-cyan-100 text-[22px] gap-6">
      <h1 className="font-bold">Hello {username} 🙋‍♂️</h1>
      <h3>
        Please verify your email "<span className="text-zinc-200 font-extrabold">{email}</span>" to
        access our features
      </h3>
      <Button label="Resend Email" size="xl" />
    </div>
  )
}
