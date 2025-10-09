import { EditProfileForm } from './components/EditProfileForm'

const EditProfilePage = () => {
  return (
    <div className='flex-center h-full'>
      <div className='flex-column border-secondary my-20 w-fit min-w-2xl gap-9 rounded-lg border bg-white p-8 py-16'>
        <h3 className='font-jalnan text-accent text-center text-3xl leading-9 font-bold'>
          프로필 수정
        </h3>
        <EditProfileForm />
      </div>
    </div>
  )
}

export default EditProfilePage
