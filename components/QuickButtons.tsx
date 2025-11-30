'use client';

interface QuickButton {
  label: string;
  query: string;
  icon?: string;
}

interface QuickButtonsProps {
  onButtonClick: (query: string) => void;
}

const quickButtons: QuickButton[] = [
  {
    label: 'どんな会社？',
    query: 'この会社について教えてください',
    icon: '🏢'
  },
  {
    label: '何やってる？',
    query: '主な事業内容は何ですか？',
    icon: '💼'
  },
  {
    label: '何やりたい？',
    query: 'ビジョンやミッションは何ですか？',
    icon: '🎯'
  },
  {
    label: '売上はどう作る？',
    query: 'ビジネスモデルを教えてください',
    icon: '💰'
  },
  {
    label: 'ターゲットは？',
    query: 'ターゲット顧客は誰ですか？',
    icon: '🎪'
  },
  {
    label: '実績は？',
    query: 'これまでの実績を教えてください',
    icon: '🏆'
  }
];

export default function QuickButtons({ onButtonClick }: QuickButtonsProps) {
  return (
    <div className="w-full max-w-3xl mt-8">
      <p className="text-gray-600 text-center mb-4 text-sm">よくある質問</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {quickButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => onButtonClick(button.query)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md font-medium text-gray-700 hover:text-blue-700"
          >
            {button.icon && <span className="text-xl">{button.icon}</span>}
            <span>{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
