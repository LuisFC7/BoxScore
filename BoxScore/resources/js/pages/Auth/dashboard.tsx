export default function DashboardPage({ email }: { email: string }) {
    return (
        <div className="p-6">
            <p className="text-lg">Hola, {email}</p>
            <h1 className="text-2xl font-bold mt-4">Dashboard</h1>
        </div>
    );
}
