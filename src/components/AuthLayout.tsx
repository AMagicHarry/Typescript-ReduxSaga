import { Link } from "react-router-dom";

//component

interface AccountLayoutProps {
  pageImage?: any;
  authTitle?: string;
  helpText?: string;
  bottomLinks?: any;
  isCombineForm?: boolean;
  children?: any;
  hasForm?: boolean;
  userImage?: string;
}

const AuthLayout = ({
  pageImage,
  authTitle,
  helpText,
  bottomLinks,
  isCombineForm,
  children,
  hasForm,
  userImage,
}: AccountLayoutProps) => {
  return (
    <>
      <div className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-700 dark:via-gray-900 dark:to-black">
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="2xl:w-1/4 lg:w-1/3 md:w-1/2 w-full">
            <div className="card overflow-hidden sm:rounded-md rounded-none">
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-xl font-bold text-center mb-1">{authTitle}</p>
                  <p className="text-xs text-center">{helpText}</p>
                </div>
                {children}

                {bottomLinks}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
