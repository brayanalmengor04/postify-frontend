import loginImage from "../../assets/images/avatarDefault.jpg"; 

export default function ReplyItem({ reply }) {
    return (
      <div className="mt-3 ml-10 w-[90%] flex space-x-3">
        <div className="w-1 bg-purple-500 rounded-lg"></div>
        <div className="flex-1 bg-white p-4 rounded-lg shadow-lg border border-gray-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={loginImage}
                alt="User"
                className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
              />
              <div>
                <p className="font-semibold text-gray-900">{reply.author.name} {reply.author.lastName}</p>
                <p className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <p className="mt-2 text-gray-700 text-sm leading-relaxed border-l-4 border-gray-300 pl-3">{reply.content}</p>
        </div>
      </div>
    );
}
