import Homepage from "./Homepage";

const DashboardPage = () => {
	return (
		<div className='dashboard-page-container'>
			{/* The content for the dashboard (like HomePage, TransactionList, etc.) 
				is determined by the <DashboardRoutes> in App.js.
				DashboardPage itself acts as the entry point specified for the "/" route within DashboardRoutes.
				For now, we'll render HomePage directly as the primary content of the dashboard. */}

			<Homepage />

		</div>
	)
}

export default DashboardPage