import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = () => {
  const loggedIn = {firstName: 'Miguel', lastName: 'Armenta', email: 'armacomiguel@gmail.com'};
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
        RECENT TRANSACTIONS
      </div>
      <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance: 123.50},{currentBalance: 452.43}]}/>
    </section>
  )
}

export default Home;