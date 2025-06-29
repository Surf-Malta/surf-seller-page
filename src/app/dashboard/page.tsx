// src/app/dashboard/page.tsx
"use client";

import { useSelector, useDispatch } from "react-redux";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ref, onValue, get } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";
import { logout } from "@/store/slices/authSlice";

interface DashboardStats {
  totalProducts: number;
  totalSales: number;
  totalCustomers: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
  recentOrders: any[];
  recentProducts: any[];
  monthlyEarnings: number[];
  popularCategories: string[];
}

interface RecentActivity {
  id: string;
  type: "order" | "product" | "customer" | "review";
  title: string;
  description: string;
  timestamp: string;
  amount?: number;
  status?: string;
  icon: string;
}

export default function DashboardPage() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalSales: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    recentOrders: [],
    recentProducts: [],
    monthlyEarnings: [0, 0, 0, 0, 0, 0],
    popularCategories: [],
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Check if user is new (registered in last 24 hours)
    if (user?.createdAt) {
      const userCreated = new Date(user.createdAt);
      const now = new Date();
      const timeDiff = now.getTime() - userCreated.getTime();
      const hoursDiff = timeDiff / (1000 * 3600);
      setShowWelcome(hoursDiff < 24);
    }

    fetchDashboardData();
  }, [isAuthenticated, router, user]);

  const fetchDashboardData = async () => {
    if (!realtimeDb || !user) return;

    try {
      setLoading(true);

      // Fetch user's products
      const productsRef = ref(realtimeDb, "products");
      const productsSnapshot = await get(productsRef);

      let userProducts: any[] = [];
      if (productsSnapshot.exists()) {
        const allProducts = productsSnapshot.val();
        userProducts = Object.values(allProducts).filter(
          (product: any) => product.sellerId === user.id
        );
      }

      // Fetch user's orders
      const ordersRef = ref(realtimeDb, "orders");
      const ordersSnapshot = await get(ordersRef);

      let userOrders: any[] = [];
      if (ordersSnapshot.exists()) {
        const allOrders = ordersSnapshot.val();
        userOrders = Object.values(allOrders).filter(
          (order: any) => order.sellerId === user.id
        );
      }

      // Calculate stats
      const totalRevenue = userOrders.reduce(
        (sum: number, order: any) =>
          order.status === "completed" ? sum + (order.totals?.total || 0) : sum,
        0
      );

      const pendingOrders = userOrders.filter(
        (order: any) =>
          order.status === "pending" || order.status === "processing"
      ).length;

      const lowStockProducts = userProducts.filter(
        (product: any) =>
          product.inventory?.quantity && product.inventory.quantity < 10
      ).length;

      const uniqueCustomers = new Set(
        userOrders.map((order: any) => order.buyerId)
      ).size;

      // Generate recent activity
      const activities: RecentActivity[] = [];

      // Add recent orders
      userOrders
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 3)
        .forEach((order) => {
          activities.push({
            id: order.id,
            type: "order",
            title: `Order #${order.orderNumber}`,
            description: `${order.items?.length || 0} items - $${
              order.totals?.total?.toFixed(2) || "0.00"
            }`,
            timestamp: order.createdAt,
            amount: order.totals?.total,
            status: order.status,
            icon: "📦",
          });
        });

      // Add recent products
      userProducts
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 2)
        .forEach((product) => {
          activities.push({
            id: product.id,
            type: "product",
            title: "New Product Listed",
            description: product.title,
            timestamp: product.createdAt,
            icon: "🆕",
          });
        });

      // Sort activities by timestamp
      activities.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      // Generate monthly earnings (mock data for demo)
      const monthlyEarnings = Array.from({ length: 6 }, (_, i) => {
        const monthOrders = userOrders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          const targetMonth = new Date();
          targetMonth.setMonth(targetMonth.getMonth() - (5 - i));
          return (
            orderDate.getMonth() === targetMonth.getMonth() &&
            orderDate.getFullYear() === targetMonth.getFullYear() &&
            order.status === "completed"
          );
        });
        return monthOrders.reduce(
          (sum, order) => sum + (order.totals?.total || 0),
          0
        );
      });

      setStats({
        totalProducts: userProducts.length,
        totalSales: userOrders.filter((order) => order.status === "completed")
          .length,
        totalCustomers: uniqueCustomers,
        totalRevenue: totalRevenue,
        pendingOrders: pendingOrders,
        lowStockProducts: lowStockProducts,
        recentOrders: userOrders.slice(0, 5),
        recentProducts: userProducts.slice(0, 5),
        monthlyEarnings: monthlyEarnings,
        popularCategories: ["Electronics", "Fashion", "Home"],
      });

      setRecentActivity(activities.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    const total = 4;

    if (stats.totalProducts > 0) completed++;
    if (user?.profile?.firstName) completed++;
    if (stats.totalSales > 0) completed++;
    if (user?.preferences?.shippingMethod) completed++;

    return Math.round((completed / total) * 100);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <Container>
          <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="bg-gray-300 rounded-2xl h-32 mb-8"></div>

            {/* Stats skeleton */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-300 rounded-xl h-24"></div>
              ))}
            </div>

            {/* Content skeleton */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-300 rounded-xl h-64 mb-6"></div>
                <div className="bg-gray-300 rounded-xl h-64"></div>
              </div>
              <div>
                <div className="bg-gray-300 rounded-xl h-64 mb-6"></div>
                <div className="bg-gray-300 rounded-xl h-64"></div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Container>
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 right-4 text-4xl">🚀</div>
              <div className="absolute bottom-4 left-4 text-3xl">💰</div>
              <div className="absolute top-8 left-1/4 text-2xl">⭐</div>
              <div className="absolute bottom-8 right-1/3 text-2xl">📈</div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                    Welcome back, {user.name}! 👋
                  </h1>
                  <p className="text-blue-100 text-lg mb-4">
                    {showWelcome
                      ? "Your seller journey starts here! Let's get your first product listed."
                      : "Ready to grow your business today?"}
                  </p>

                  {/* Profile completion */}
                  <div className="flex items-center space-x-3">
                    <div className="text-sm">Profile completion:</div>
                    <div className="flex-1 max-w-xs bg-blue-800 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-500"
                        style={{ width: `${getCompletionPercentage()}%` }}
                      ></div>
                    </div>
                    <div className="text-sm font-semibold">
                      {getCompletionPercentage()}%
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex items-center space-x-4">
                  <Link href="/dashboard/profile">
                    <Button variant="secondary" size="sm">
                      Edit Profile
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="elevated-card p-6 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-3">📦</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalProducts}
            </div>
            <div className="text-sm text-gray-600">Products Listed</div>
            {stats.totalProducts === 0 && (
              <Link
                href="/dashboard/products/add"
                className="mt-2 inline-block"
              >
                <Button size="sm" variant="outline">
                  Add First Product
                </Button>
              </Link>
            )}
          </div>

          <div className="elevated-card p-6 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-3">📊</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalSales}
            </div>
            <div className="text-sm text-gray-600">Total Sales</div>
            {stats.pendingOrders > 0 && (
              <div className="mt-2 text-xs text-orange-600 font-medium">
                {stats.pendingOrders} pending orders
              </div>
            )}
          </div>

          <div className="elevated-card p-6 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-3">👥</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalCustomers}
            </div>
            <div className="text-sm text-gray-600">Customers</div>
          </div>

          <div className="elevated-card p-6 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-3">💰</div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {formatCurrency(stats.totalRevenue)}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
            {stats.lowStockProducts > 0 && (
              <div className="mt-2 text-xs text-red-600 font-medium">
                {stats.lowStockProducts} low stock items
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Getting Started (for new users) */}
            {stats.totalProducts === 0 && (
              <div className="elevated-card p-8 border-2 border-blue-200 bg-blue-50">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🚀</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Let's Get Started!
                    </h2>
                    <p className="text-gray-600">
                      Complete these steps to start selling
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Add Your First Product
                        </h3>
                        <p className="text-sm text-gray-600">
                          Start selling by listing your first item
                        </p>
                      </div>
                    </div>
                    <Link href="/dashboard/products/add">
                      <Button size="sm">Add Product</Button>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Complete Your Profile
                        </h3>
                        <p className="text-sm text-gray-600">
                          Add business details and payment info
                        </p>
                      </div>
                    </div>
                    <Link href="/dashboard/profile">
                      <Button variant="outline" size="sm">
                        Setup Profile
                      </Button>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Configure Shipping
                        </h3>
                        <p className="text-sm text-gray-600">
                          Set up your shipping methods and rates
                        </p>
                      </div>
                    </div>
                    <Link href="/dashboard/shipping">
                      <Button variant="outline" size="sm">
                        Setup Shipping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Monthly Earnings Chart */}
            {stats.totalSales > 0 && (
              <div className="elevated-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    📈 Earnings Overview
                  </h2>
                  <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                    <option>Last 6 months</option>
                    <option>Last 12 months</option>
                    <option>This year</option>
                  </select>
                </div>

                <div className="grid grid-cols-6 gap-4">
                  {stats.monthlyEarnings.map((earning, index) => {
                    const monthNames = [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                    ];
                    const maxEarning = Math.max(...stats.monthlyEarnings);
                    const height =
                      maxEarning > 0 ? (earning / maxEarning) * 200 : 20;

                    return (
                      <div key={index} className="text-center">
                        <div
                          className="mb-2 flex items-end justify-center"
                          style={{ height: "200px" }}
                        >
                          <div
                            className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg w-full transition-all duration-500 hover:from-blue-700 hover:to-blue-500"
                            style={{ height: `${height}px`, minHeight: "20px" }}
                            title={formatCurrency(earning)}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          {monthNames[index]}
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(earning)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="elevated-card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📋 Recent Activity
              </h2>

              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {activity.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {activity.description}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(activity.timestamp)}
                        </div>
                      </div>
                      {activity.amount && (
                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            {formatCurrency(activity.amount)}
                          </div>
                          {activity.status && (
                            <div
                              className={`text-xs px-2 py-1 rounded-full ${
                                activity.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : activity.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {activity.status}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="text-center pt-4">
                    <Link href="/dashboard/activity">
                      <Button variant="outline" size="sm">
                        View All Activity
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Activity Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Once you start selling, you'll see your sales, orders, and
                    customer activity here.
                  </p>
                  <Link href="/dashboard/products/add">
                    <Button>List Your First Product</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="elevated-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ⚡ Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/dashboard/products/add"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <span className="text-xl">➕</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Add Product</div>
                    <div className="text-sm text-gray-600">List a new item</div>
                  </div>
                </Link>

                <Link
                  href="/dashboard/orders"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <span className="text-xl">📋</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">View Orders</div>
                    <div className="text-sm text-gray-600">
                      Manage your sales
                    </div>
                  </div>
                </Link>

                <Link
                  href="/dashboard/analytics"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Analytics</div>
                    <div className="text-sm text-gray-600">
                      Track performance
                    </div>
                  </div>
                </Link>

                <Link
                  href="/dashboard/customers"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <span className="text-xl">👥</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Customers</div>
                    <div className="text-sm text-gray-600">
                      Manage relationships
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="elevated-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🎯 Performance Insights
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">
                      Conversion Rate
                    </span>
                    <span className="text-sm font-bold text-blue-900">
                      {stats.totalSales > 0 ? "3.2%" : "0%"}
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "32%" }}
                    ></div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-900">
                      Customer Satisfaction
                    </span>
                    <span className="text-sm font-bold text-green-900">
                      4.8/5
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${
                          star <= 4 ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-900">
                      Profile Completeness
                    </span>
                    <span className="text-sm font-bold text-purple-900">
                      {getCompletionPercentage()}%
                    </span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getCompletionPercentage()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips & Resources */}
            <div className="elevated-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 Tips & Resources
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    📸 Great Photos Sell Better
                  </h4>
                  <p className="text-sm text-blue-800">
                    Products with high-quality photos get 3x more views and sell
                    faster.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">
                    💬 Respond Quickly
                  </h4>
                  <p className="text-sm text-green-800">
                    Fast responses to customer questions increase your sales by
                    40%.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    🎯 Optimize Your Listings
                  </h4>
                  <p className="text-sm text-purple-800">
                    Use relevant keywords in your product titles and
                    descriptions.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  href="/help/seller-guide"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Complete Seller Guide →
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="elevated-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🆘 Need Help?
              </h3>
              <div className="space-y-3">
                <Link
                  href="/help"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl">📚</span>
                  <div>
                    <div className="font-medium text-gray-900">Help Center</div>
                    <div className="text-sm text-gray-600">
                      Find answers to common questions
                    </div>
                  </div>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl">💬</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      Contact Support
                    </div>
                    <div className="text-sm text-gray-600">
                      Get help from our team
                    </div>
                  </div>
                </Link>
                <Link
                  href="/seller-guide"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl">📖</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      Seller Guide
                    </div>
                    <div className="text-sm text-gray-600">
                      Learn best practices
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Success Welcome Message for New Users */}
        {showWelcome && (
          <div className="fixed bottom-4 right-4 max-w-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-2xl animate-slide-up z-50">
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🎉</span>
              <div>
                <div className="font-bold text-lg">Welcome to Surf Seller!</div>
                <div className="text-sm opacity-90 mb-3">
                  Your account is ready. Start listing products to begin
                  selling!
                </div>
                <Link href="/dashboard/products/add">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-green-600"
                  >
                    Add First Product
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
