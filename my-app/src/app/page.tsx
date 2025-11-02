import EditorLayout from "@/components/EditorLayout";
import DndProviderWrapper from "@/provider/DndProviderWrapper";

export default function Home() {
  return (
    <DndProviderWrapper>
      <EditorLayout />
    </DndProviderWrapper>
  );
}
