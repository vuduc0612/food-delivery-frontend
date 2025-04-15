import { useState } from "react"
import { Search, ChevronRight } from "lucide-react"

const OrderHistory = () =>{
  const [activeTab, setActiveTab] = useState("chưa giao")

  // Sample order data
  const orders = [
    {
      id: 1,
      date: "05/04/2025",
      time: "21:25",
      restaurant: "Ốc Ngon Hà Nội & Chân Gà Rang Muối - Lê Lai",
      quantity: "5 phần",
      price: "283.000đ",
      orderCode: "45092282",
      status: "GIAO THÀNH CÔNG",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      date: "01/04/2025",
      time: "12:18",
      restaurant: "Cơm Thố Anh Nguyễn - Phùng Hưng",
      quantity: "1 phần",
      price: "58.500đ",
      orderCode: "45293865",
      status: "GIAO THÀNH CÔNG",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      date: "03/03/2025",
      time: "12:17",
      restaurant: "Bento Delichi - Cơm Gà Xối Mỡ & Cơm Gà Mắm Tỏi - Phùng Hưng",
      quantity: "1 phần",
      price: "47.500đ",
      orderCode: "43263735",
      status: "GIAO THÀNH CÔNG",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      date: "17/02/2025",
      time: "21:22",
      restaurant: "Cơm Thố Anh Nguyễn - Phùng Hưng",
      quantity: "1 phần",
      price: "77.000đ",
      orderCode: "42271771",
      status: "ĐÃ HỦY",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      date: "17/02/2025",
      time: "21:18",
      restaurant: "Cơm Thố Anh Nguyễn - Phùng Hưng",
      quantity: "1 phần",
      price: "85.000đ",
      orderCode: "42271496",
      status: "ĐÃ HỦY",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      date: "15/01/2025",
      time: "12:26",
      restaurant: "Cơm Thố Anh Nguyễn - Phùng Hưng",
      quantity: "1 phần",
      price: "68.000đ",
      orderCode: "39991581",
      status: "GIAO THÀNH CÔNG",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      date: "13/01/2025",
      time: "21:54",
      restaurant: "Sinry Chicken - Gà Rán & Cơm Trộn Hàn Quốc - Triều khúc",
      quantity: "1 phần",
      price: "58.000đ",
      orderCode: "39882706",
      status: "ĐÃ HỦY",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      <div className="p-4">
        {/* Tabs and Search */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex bg-gray-100 rounded-full p-1">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "chưa giao" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("chưa giao")}
            >
              Chưa giao
              {activeTab === "chưa giao" && (
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">0</span>
              )}
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "đã giao" ? "bg-gray-800 text-white" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("đã giao")}
            >
              Đã giao
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Tìm món ăn hoặc nhà hàng"
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={order.image || "/placeholder.svg"}
                    alt={order.restaurant}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-gray-500 text-sm">
                        {order.date} | {order.time}
                      </div>
                      <h3 className="font-medium text-gray-900 mt-1">{order.restaurant}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        {order.quantity} • {order.price}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Mã đơn hàng: {order.orderCode}</div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <button className="border border-blue-500 text-blue-500 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
                        Đặt lại
                      </button>

                      <div className="flex items-center">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            order.status === "GIAO THÀNH CÔNG"
                              ? "bg-green-100 text-green-700"
                              : order.status === "ĐÃ HỦY"
                                ? "bg-gray-100 text-gray-500"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-300 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default OrderHistory;