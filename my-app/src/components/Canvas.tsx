import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { addItem, EditorItem } from "../future/editor/editorSlice";
import { RootState } from "../store/store";

const RenderItem = ({ item }: any) => {
  const dispatch = useDispatch();

  const [, drop] = useDrop(() => ({
    accept: "BOX",
    drop: (childItem: { type: string }, monitor) => {
      if (item.type === "container") {
        if (monitor.didDrop()) return;
        dispatch(addItem({ parentId: item.id, type: childItem.type }));
      }
    },
  }));

  const renderComponent = () => {
    switch (item.type) {
      case "text":
        return (
          <p style={{ color: item.props.color, fontSize: item.props.fontSize }}>
            {item.props.text}
          </p>
        );
      case "button":
        return (
          <button className="px-3 py-1 bg-blue-500 text-white rounded">
            {item.props.label}
          </button>
        );
      case "image":
        return (
          <img
            src={item.props.src}
            alt={item.props.alt}
            style={{ width: item.props.width, height: item.props.height }}
          />
        );
      case "hero":
        return (
          <div className="p-6 bg-gray-100 rounded-xl text-center">
            <h2 className="text-2xl font-bold">{item.props.title}</h2>
            <p>{item.props.subtitle}</p>
            <img
              src={item.props.image}
              alt=""
              className="w-full mt-2 rounded-lg"
            />
            <button className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded">
              {item.props.ctaLabel}
            </button>
          </div>
        );
      case "container":
        return (
          <div
            ref={drop as any}
            style={{
              background: item.props.backgroundColor,
              padding: item.props.padding,
            }}
            className="rounded border border-gray-200"
          >
            {item.children?.map((child: EditorItem) => (
              <RenderItem key={child.id} item={child} />
            ))}
          </div>
        );
      default:
        return <div>Unknown component</div>;
    }
  };

  return <div className="m-2">{renderComponent()}</div>;
};

export default function Canvas() {
  const items = useSelector((state: RootState) => state.editor.items);
  const dispatch = useDispatch();

  const [, drop] = useDrop(() => ({
    accept: "BOX",
    drop: (item: { type: string }, monitor) => {
      if (monitor.didDrop()) return;
      dispatch(addItem({ type: item.type }));
    },
  }));

  return (
    <div
      ref={drop as any}
      className="flex-1 min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto border-l border-gray-200"
    >
      <div className="text-lg font-semibold text-gray-700 mb-4">
        Canvas Area
      </div>
      {items.length === 0 ? (
        <div className="h-[70vh] flex items-center justify-center text-gray-400 italic">
          Drag components from the sidebar and drop here.
        </div>
      ) : (
        items.map((item) => <RenderItem key={item.id} item={item} />)
      )}
    </div>
  );
}
