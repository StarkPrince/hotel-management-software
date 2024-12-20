export function DashboardStats()
{
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-primary/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Loyalty Points</h3>
                <p className="text-3xl font-bold">2,450</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Total Stays</h3>
                <p className="text-3xl font-bold">8</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Special Offers</h3>
                <p className="text-3xl font-bold">3</p>
            </div>
        </div>
    );
}