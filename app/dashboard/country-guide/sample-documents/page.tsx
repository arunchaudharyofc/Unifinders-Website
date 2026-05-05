import { ArrowRight } from "lucide-react";

export default function CountryGuideDocumentsPage() {
  const documents = [
    { title: "CV/Resume", color: "text-teal-500", icon: "📋" },
    { title: "Statement of Purpose(SOP)", color: "text-amber-500", icon: "📝" },
    { title: "ID/VISA", color: "text-blue-500", icon: "🛂" },
    { title: "Work Experience", color: "text-orange-500", icon: "💼" },
    { title: "Bank Document", color: "text-yellow-500", icon: "🏦" },
    { title: "Relationship Document", color: "text-green-500", icon: "👥" },
    { title: "Tax Clearance", color: "text-amber-700", icon: "📄" },
    { title: "Sponsorship Letter", color: "text-blue-400", icon: "🤝" }
  ];

  return (
    <div className="max-w-[1200px] mx-auto py-12 px-8">
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {documents.map((doc, i) => (
          <div key={i} className="bg-white border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition cursor-pointer group" style={{ borderColor: '#EAECF0', minHeight: '220px' }}>
            <div className={`text-6xl mb-6 group-hover:scale-110 transition-transform ${doc.color}`}>
              {doc.icon}
            </div>
            <h3 className="text-[16px] font-bold text-[#101828]">{doc.title}</h3>
          </div>
        ))}
      </div>

    </div>
  );
}
