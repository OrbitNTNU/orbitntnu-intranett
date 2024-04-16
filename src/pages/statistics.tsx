import Layout from '@/templates/Layout';
import MemberDistribution from '@/components/StatisticsPage/TeamDistribution';
import BreakLine from '@/components/General/Breakline';
import TeamsGrowth from '@/components/StatisticsPage/TeamsGrowth';
import Studies from '@/components/StatisticsPage/Studies';
import Age from '@/components/StatisticsPage/Age';

const Statistics = () => {
  return (
    <Layout>
        <MemberDistribution/>
        <BreakLine/>
        <TeamsGrowth/>
        <BreakLine/>
        <Studies/>
        <BreakLine/>
        <Age/>
    </Layout>
  );
};

export default Statistics;
