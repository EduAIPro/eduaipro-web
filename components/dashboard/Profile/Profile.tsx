"use client";
import FormInput from "@/components/common/ui/FormInput";
import Typography from "@/components/common/ui/Typography";
import defaultImage from "@/public/assets/images/default-profile.webp";
import { Button } from "@radix-ui/themes";
import { Form, Formik } from "formik";
import { Eye, EyeSlash, KeySquare, ProfileCircle, Sms } from "iconsax-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import Status from "../common/Status";

const Profile = () => {
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(
    null
  );
  const [imgFile, setImgFile] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center  shadow-grey-6 w-full md:w-[70%] lg:w-[60%] mx-auto max-sm:p-3 p-6 rounded-md">
      {/* profile image */}
      <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border">
        <Image
          src={typeof profileImg === "string" ? profileImg : defaultImage}
          alt="user profile image"
          height={300}
          width={300}
          className="w-full h-full object-cover"
        />
        <div
          role="button"
          onClick={() => imageRef?.current?.click()}
          className="absolute flex items-center justify-center bottom-0 h-8 md:h-10 bg-[#00000080] text-sm md:text-lg text-white left-0 right-0"
        >
          <FaCamera />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={imageRef}
            style={{ display: "none" }}
          />
        </div>
      </div>
      {imgFile && (
        <div className="self-center">
          <Button className="primary__btn btn !py-1">
            <Typography.P fontColor="white">Update</Typography.P>
          </Button>
        </div>
      )}
      <Status status="pending" text="Not Accredited" />

      {/* personal info form */}
      <Formik
        initialValues={{
          firstName: "Fortune",
          lastName: "Oliseyenum",
          email: "kingjasper.dev",
          username: "KingJasper",
        }}
        onSubmit={(values) => {
          console.log("profile updated successfully");
        }}
        // validationSchema={signupValidation}
      >
        {({ touched, errors }) => (
          <Form className="flex-col flex gap-y-4 w-full mt-10">
            <Typography.H5 className="font-semibold text-xl">
              Profile Information
            </Typography.H5>
            <div className="flex flex-col md:flex-row items-center justify-between gap-x-3">
              <FormInput
                label="First name"
                placeholder="John"
                className="w-full"
                name="firstName"
                error={
                  touched.firstName && errors.firstName
                    ? errors.firstName
                    : null
                }
                leftIcon={<ProfileCircle />}
              />
              <FormInput
                label="Last name"
                placeholder="Okoye"
                className="w-full"
                name="lastName"
                error={
                  touched.lastName && errors.lastName ? errors.lastName : null
                }
                leftIcon={<ProfileCircle />}
              />
            </div>
            <FormInput
              label="Username"
              placeholder="Enter your preferred username"
              className="w-full"
              name="username"
              error={
                touched.username && errors.username ? errors.username : null
              }
              leftIcon={<ProfileCircle />}
            />
            <FormInput
              label="Email address"
              name="email"
              placeholder="name@example.com"
              type="email"
              error={touched.email && errors.email ? errors.email : null}
              leftIcon={<Sms />}
            />

            <div className="mt-4 self-end">
              <Button className="primary__btn btn">
                <Typography.P fontColor="white">Save</Typography.P>
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      {/* password change form */}
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          console.log("profile updated successfully");
        }}
        // validationSchema={signupValidation}
      >
        {({ touched, errors }) => (
          <Form className="flex-col flex gap-y-4 w-full mt-10">
            <Typography.H5 className="font-semibold text-xl">
              Change Password
            </Typography.H5>

            <FormInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              error={
                touched.password && errors.password ? errors.password : null
              }
              type={showPassword ? "text" : "password"}
              leftIcon={<KeySquare />}
              rightIcon={
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </div>
              }
            />
            <FormInput
              name="confirmPassword"
              label="Confirm password"
              placeholder="Enter your password again"
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : null
              }
              type={showPassword ? "text" : "password"}
              leftIcon={<KeySquare />}
              rightIcon={
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </div>
              }
            />
            <div className="mt-4 self-end">
              <Button className="primary__btn btn">
                <Typography.P fontColor="white">Confirm</Typography.P>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
