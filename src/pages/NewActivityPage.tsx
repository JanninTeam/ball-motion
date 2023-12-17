import BaseText from '../components/BaseText';
import Button from '../components/Button';
import Page from '../components/Page';
import Title from '../components/Title';

export default function NewActivityPage() {
  return (
    <Page>
      <Title>New Activity</Title>
      <BaseText>New Activity</BaseText>
      <Button onPress={() => {}} text="Start" />
    </Page>
  );
}
