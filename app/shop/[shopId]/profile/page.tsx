import { BadgeCheck, User } from "lucide-react";
import { UserButton, auth } from "@clerk/nextjs";

import AttachmentForm from "@/components/attachment-form";
import { db } from "@/lib/db";

const ProfilePage = async () => {
  const { userId } = auth();

  const user = await db.user.findUnique({
    where: {
      userId: userId as string
    }
  });

  return (
    <section className="px-4 md:px-6 my-10">
      <div className="flex items-center gap-x-3">
        <div className="bg-slate-200 p-3 w-fit rounded-md max-lg:hidden">
          <User className="h-8 w-8 text-slate-700" />
        </div>
        <div>
          <h2 className="text-xl md:text-[22px] font-semibold">Profile</h2>
          <p className="text-sm text-slate-500">
            Manage and update your profile
          </p>
        </div>
      </div>

      <div className="mt-12 w-full md:max-w-2xl p-6 bg-slate-100 border rounded-xl">
        <div className="flex items-center gap-4">
          <div className="rounded-full border-4">
            <UserButton afterSignOutUrl="/" />
          </div>
          <p className="text-sm text-slate-400 italic">
            👈 Click this profile to manage your account
          </p>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex">
            <h3 className="w-1/3 font-medium text-slate-900">Name</h3>
            <h3 className="text-slate-500">{user?.firstName}{" "}{user?.lastName}</h3>
          </div>
          <hr />
          <div className="flex">
            <h3 className="w-1/3 font-medium text-slate-900">ID</h3>
            <h3 className="text-slate-500 line-clamp-1">{user?.userId}</h3>
          </div>
          <hr />
          <div className="flex">
            <h3 className="w-1/3 font-medium text-slate-900">Email</h3>
            <h3 className="text-slate-500 line-clamp-1">{user?.email}</h3>
          </div>
          <hr />
          <div className="flex">
            <h3 className="w-1/3 font-medium text-slate-900">Role</h3>
            <h3 className="text-slate-500">{user?.email === 'dassslimited@gmail.com' ? 'Admin' : 'Employee'}</h3>
          </div>
          <hr />
          <div className="flex">
            <h3 className="w-1/3 font-medium text-slate-900">Status</h3>
            <h3 className="text-slate-500 italic">
              {user?.isVerified === true ? (
                <span className="flex items-center gap-2">verified <BadgeCheck className="h-4 w-4 text-[#00C04B] font-bold" /></span>
              ) : 'not verified'}
            </h3>
          </div>
        </div>
      </div>
      
      {user && 
        <AttachmentForm 
          user={user}
        />
      }
    </section>
  )
}

export default ProfilePage