import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Law {
  id: number;
  text: string;
}

interface LawsCategory {
  id: string;
  name: string;
  emoji: string;
  laws: Law[];
}

const lawsData: LawsCategory[] = [
  {
    id: "city",
    name: "قوانين المدينة",
    emoji: "🏙️",
    laws: [
      { id: 1, text: "يمنع القتل العشوائي ويسمح فقط خارج المنطقة الآمنة." },
      { id: 2, text: "يمنع الدهس أو الصدم العشوائي." },
      { id: 3, text: "يمنع استخدام أسماء بذيئة." },
      { id: 4, text: "يمنع رد الغلط بالغلط، احفظ تصويرك وافتح تكت." },
      { id: 5, text: "يمنع استفزاز اللاعبين بقصد التصوير ورفع شكوى كيدية." },
      { id: 6, text: "يمنع ارتداء الملابس العسكرية مهما كان السبب." },
      { id: 7, text: "يمنع استخدام سكنات الحزم في السيناريوهات والفايتات." },
      { id: 8, text: "يجب تشغيل برنامج التصوير اثناء اللعب." },
      { id: 9, text: "يمنع التدخل في سيناريو قائم." },
      { id: 10, text: "يمنع منعاً باتاً سرقة سيارة وزارة الصحة." },
      { id: 11, text: "يمنع كلبشة الشخص وهو ميت مهما كان السبب." },
      { id: 12, text: "يمنع إهانة اللاعب بأي شكل من الأشكال." },
      { id: 13, text: "التحلي بالذوق والأدب ومراعاة مشاعر الآخرين." },
      { id: 14, text: "يمنع عمل سبام بالشات مهما كان السبب." },
    ],
  },
  {
    id: "discord",
    name: "قوانين الديسكورد",
    emoji: "💬",
    laws: [
      { id: 1, text: "احترم جميع أعضاء السيرفر." },
      { id: 2, text: "لا تنشر محتوى غير لائق." },
      { id: 3, text: "لا تقم بالإزعاج أو الإساءة للآخرين." },
    ],
  },
  {
    id: "scenarios",
    name: "قوانين السيناريوهات",
    emoji: "⚔️",
    laws: [
      { id: 1, text: "يجب اتباع القصة المرسومة للسيناريو." },
      { id: 2, text: "لا تحاول الهروب من السيناريو." },
      { id: 3, text: "احترم قرارات مدير السيناريو." },
    ],
  },
  {
    id: "gangs",
    name: "قوانين العصابات والمنظمات",
    emoji: "👥",
    laws: [
      { id: 1, text: "يجب أن تكون لديك رتبة معينة للقيام بأعمال العصابة." },
      { id: 2, text: "احترم هيكل القيادة في عصابتك." },
      { id: 3, text: "لا تخون عصابتك." },
    ],
  },
  {
    id: "ministries",
    name: "قوانين الوزارات والقطاعات",
    emoji: "🏛️",
    laws: [
      { id: 1, text: "يجب اتباع البروتوكول الرسمي للوزارة." },
      { id: 2, text: "احترم سلسلة القيادة." },
      { id: 3, text: "لا تساء استخدام صلاحياتك الوزارية." },
    ],
  },
  {
    id: "store",
    name: "قوانين المتجر",
    emoji: "🛍️",
    laws: [],
  },
];

const storeSubcategories = [
  {
    id: "store-general",
    name: "القوانين العامة للمتجر",
    emoji: "📋",
    laws: [
      { id: 1, text: "يجب احترام أسعار المتجر المحددة من قبل الإدارة." },
      { id: 2, text: "لا يسمح بالتفاوض على الأسعار." },
      { id: 3, text: "يجب الالتزام بساعات عمل المتجر." },
    ],
  },
  {
    id: "store-trading",
    name: "قوانين التداول والبيع",
    emoji: "💰",
    laws: [
      { id: 1, text: "يجب التحقق من صحة العملة قبل القبول." },
      { id: 2, text: "لا يسمح بالتداول خارج المتجر الرسمي." },
      { id: 3, text: "يجب توثيق جميع العمليات التجارية." },
    ],
  },
  {
    id: "store-security",
    name: "قوانين الأمان والحماية",
    emoji: "🔒",
    laws: [
      { id: 1, text: "يجب حماية الأموال والبضائع من السرقة." },
      { id: 2, text: "لا يسمح بدخول الأشخاص المريبين للمتجر." },
      { id: 3, text: "يجب الإبلاغ عن أي محاولة سرقة فوراً." },
    ],
  },
];

export default function Home() {
  const { theme, toggleTheme, switchable } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("city");

  const filteredLaws = lawsData
    .find((cat) => cat.id === activeCategory)
    ?.laws.filter((law) =>
      law.text.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const filteredStoreLaws = storeSubcategories
    .flatMap((sub) =>
      sub.laws.map((law) => ({
        ...law,
        subcategory: sub.name,
        emoji: sub.emoji,
      }))
    )
    .filter((law) =>
      law.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#050308] overflow-x-hidden">
      {/* Background with overlay */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1200&h=400&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          opacity: 0.3,
        }}
      ></div>

      {/* Header */}
      <header className="relative z-40 border-b border-[#3d0a2a] bg-[#050308]/80 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          {/* Title Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
              <h1
                className="text-4xl font-bold text-white"
                style={{ textShadow: "rgba(0, 0, 0, 0.7) 0px 2px 15px" }}
              >
                VibesRP
              </h1>
              <p
                className="text-sm text-gray-400"
                style={{ textShadow: "rgba(0, 0, 0, 0.5) 0px 1px 10px" }}
              >
                القوانين الرسمية
              </p>
            </div>

            {/* Status and Theme Toggle */}
            <div className="flex items-center gap-4">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-full"
                style={{ boxShadow: "rgba(34, 197, 94, 0.4) 0px 0px 10px" }}
              >
                <span className="w-2 h-2 rounded-full bg-[#25ba3b] animate-pulse"></span>
                <span className="text-sm font-medium text-[#25ba3b]">
                  نشط الآن
                </span>
              </div>

              {switchable && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full border border-[#3d0a2a] hover:bg-[#3d0a2a] transition-colors"
                  title={theme === "light" ? "تبديل للوضع الداكن" : "تبديل للوضع الفاتح"}
                >
                  {theme === "light" ? (
                    <Moon className="h-5 w-5 text-white" />
                  ) : (
                    <Sun className="h-5 w-5 text-white" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button className="px-4 py-2 rounded-lg bg-[#1a93fe] text-white font-medium hover:bg-[#1487fa] transition-colors">
              🎮 العب الآن
            </button>
            <button className="px-4 py-2 rounded-lg border border-[#3d0a2a] text-gray-300 font-medium hover:bg-[#3d0a2a] transition-colors">
              💬 الديسكورد
            </button>
          </div>

          {/* Search Bar */}
          <Input
            type="text"
            placeholder="ابحث عن قانون..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a0520] border-[#3d0a2a] text-white placeholder-gray-500"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 container mx-auto px-4 py-8">
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
          {lawsData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                activeCategory === category.id
                  ? "bg-[#d4307a] border-[#d4307a] text-white"
                  : "border-[#3d0a2a] text-gray-300 hover:bg-[#3d0a2a]"
              }`}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Laws Content */}
        <div className="space-y-4">
          {activeCategory === "store" ? (
            // Store Laws Subcategories
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {storeSubcategories.map((subcategory) => (
                  <div
                    key={subcategory.id}
                    className="p-4 rounded-lg border border-[#3d0a2a] bg-[#1a0520]/50 hover:bg-[#1a0520] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{subcategory.emoji}</span>
                      <h3 className="font-bold text-white">{subcategory.name}</h3>
                    </div>
                    <div className="space-y-2">
                      {subcategory.laws.map((law) => (
                        <div
                          key={law.id}
                          className="flex gap-3 p-2 rounded bg-[#3d0a2a]/30 hover:bg-[#3d0a2a]/50 transition-colors"
                        >
                          <span className="font-bold text-[#d4307a] min-w-fit">
                            {law.id}.
                          </span>
                          <p className="text-sm text-gray-300">{law.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Filtered Store Laws Display */}
              {searchQuery && filteredStoreLaws.length > 0 && (
                <div className="mt-8 p-4 rounded-lg border border-[#3d0a2a] bg-[#1a0520]/50">
                  <h3 className="font-bold text-white mb-4">نتائج البحث</h3>
                  <div className="space-y-3">
                    {filteredStoreLaws.map((law) => (
                      <div
                        key={`${law.subcategory}-${law.id}`}
                        className="flex gap-3 p-3 rounded bg-[#3d0a2a]/30 hover:bg-[#3d0a2a]/50 transition-colors"
                      >
                        <span className="text-lg">{law.emoji}</span>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            {law.subcategory}
                          </p>
                          <p className="text-gray-300">{law.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Regular Categories Laws List
            <div className="space-y-3">
              {filteredLaws.length > 0 ? (
                filteredLaws.map((law) => (
                  <div
                    key={law.id}
                    className="flex gap-4 p-4 rounded-lg border border-[#3d0a2a] bg-[#1a0520]/50 hover:bg-[#1a0520] transition-colors"
                  >
                    <span className="font-bold text-[#d4307a] text-lg min-w-fit">
                      {law.id}.
                    </span>
                    <p className="text-gray-300">{law.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">لم يتم العثور على قوانين</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-[#3d0a2a] bg-[#050308]/80 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2024 VibesRP - جميع الحقوق محفوظة</p>
          <p className="mt-1">آخر تحديث: ١٣‏/٥‏/٢٠٢٦</p>
        </div>
      </footer>
    </div>
  );
}
