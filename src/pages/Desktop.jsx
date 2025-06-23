export default function Desktop() {
  const username = localStorage.getItem("username");

  return (
    <div className="h-screen bg-gray-50 p-4">
      <h2 className="text-lg">Welcome, <span className="font-bold">{username}</span></h2>
      <p>This is your desktop (MacOS style coming soon!)</p>
    </div>
  );
}
