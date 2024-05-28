import Layout from "@/components/General/Layout";
import MemberDistribution from '@/components/StatisticsPage/TeamDistribution';
import BreakLine from '@/components/General/Breakline';
import TeamsGrowth from '@/components/StatisticsPage/TeamsGrowth';
import Studies from '@/components/StatisticsPage/Studies';
import Age from '@/components/StatisticsPage/Age';
import LongestMembers from "@/components/StatisticsPage/LongestMembers";

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
        <BreakLine/>
        <LongestMembers/>
    </Layout>
  );
};

export default Statistics;
