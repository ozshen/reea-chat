import OpenAI from '../llm/OpenAI';
import STT from '../tts/features/STT';
import Translation from './features/Translation';

const Page = () => {
  return (
    <>
      <Translation />
      <STT />
      <OpenAI />
    </>
  );
};

Page.displayName = 'SystemAgent';

export default Page;
