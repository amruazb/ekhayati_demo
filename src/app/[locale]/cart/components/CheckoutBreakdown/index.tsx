
export interface CheckoutBreakdownProps {
  items: Array<{
    name: string;
    value: string;
    lineThrough?: boolean;
  }>
}
export default function CheckoutBreakdown(props: CheckoutBreakdownProps) {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      {
        props.items.map((item, index) => (
          <div key={index} className={`w-full flex flex-row items-center justify-between ${index > 0 ? "mt-4" : ""}`}>
            <p className={`text-white text-md ${item.lineThrough ? "line-through" : ""}`}>{item.name}</p>
            <p className={`text-white text-md ${item.lineThrough ? "line-through" : ""}`}>{item.value}</p>
          </div>
        ))
      }
    </div>
  )
}