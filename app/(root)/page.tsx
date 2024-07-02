import HeaderBox from '@/components/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = () => {
  const loggedIn = {firstName: 'Miguel Angel'};
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox type="greeting" title="Bienvenido" user={loggedIn?.firstName || 'Guest'}
            subtext="Accede y maneja tu cuenta y transacciones eficientemente."
          />
          <TotalBalanceBox 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1243}
          />
        </header>
      </div>
    </section>
  )
}

export default Home;