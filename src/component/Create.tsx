import CreateForm from "./CreateForm";

export default function Create() {
  return (
    <div className=" justify-center mt-6 pb-6">
      <div className="w-full max-w-lg m-auto">
        <CreateForm></CreateForm>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Vahid Turab Akbay "vta@vahidturabakbay.com"
        </p>
      </div>
    </div>
  );
}
