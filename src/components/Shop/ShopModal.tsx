import React, { useState } from 'react';
import { 
  ShoppingBag, 
  X, 
  Coins, 
  Check, 
  Palette, 
  Dices, 
  User, 
  Sparkles,
  Lock
} from 'lucide-react';
import { CosmeticItem, CosmeticType, EquippedCosmetics } from '../../types/rewards';
import { SHOP_ITEMS } from '../../data/shopItems';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  coinBalance: number;
  purchasedIds: string[];
  equipped: EquippedCosmetics;
  onPurchaseItem: (item: CosmeticItem) => void;
  onEquipItem: (type: CosmeticType, itemId: string) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onClose,
  coinBalance,
  purchasedIds,
  equipped,
  onPurchaseItem,
  onEquipItem
}) => {
  const [activeCategory, setActiveCategory] = useState<CosmeticType>('board_theme');

  if (!isOpen) return null;

  const filteredItems = SHOP_ITEMS.filter(item => item.type === activeCategory);
  const purchasedSet = new Set(purchasedIds);

  const isEquipped = (item: CosmeticItem) => {
    if (item.type === 'board_theme') return equipped.boardTheme === item.id;
    if (item.type === 'dice_skin') return equipped.diceSkin === item.id;
    if (item.type === 'player_marker') return equipped.playerMarker === item.id;
    return false;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[88vh] bg-[#111827] border border-[#263449] rounded-2xl sm:rounded-3xl shadow-2xl p-5 flex flex-col text-[#F8FAFC]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#263449]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#F8FAFC]">Cosmetics & Themes Shop</h2>
              <p className="text-xs text-[#94A3B8]">Personalize your game board, dice, and developer avatar</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Coin Balance Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#080D1A] border border-[#F59E0B]/40 text-[#F59E0B] font-bold text-xs shadow-inner">
              <Coins className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]/20" />
              <span className="font-mono text-sm">{coinBalance}</span>
            </div>

            <button onClick={onClose} className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 my-3 p-1 rounded-xl bg-[#080D1A] border border-[#263449]">
          <button
            onClick={() => setActiveCategory('board_theme')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeCategory === 'board_theme'
                ? 'bg-[#2563EB] text-[#F8FAFC] shadow-md shadow-[#2563EB]/25'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            Board Themes
          </button>
          <button
            onClick={() => setActiveCategory('dice_skin')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeCategory === 'dice_skin'
                ? 'bg-[#2563EB] text-[#F8FAFC] shadow-md shadow-[#2563EB]/25'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Dices className="w-3.5 h-3.5" />
            Dice Skins
          </button>
          <button
            onClick={() => setActiveCategory('player_marker')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeCategory === 'player_marker'
                ? 'bg-[#2563EB] text-[#F8FAFC] shadow-md shadow-[#2563EB]/25'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Player Markers
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto flex-1 py-1">
          {filteredItems.map(item => {
            const owned = purchasedSet.has(item.id) || item.cost === 0;
            const equippedItem = isEquipped(item);
            const canAfford = coinBalance >= item.cost;

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border flex flex-col justify-between gap-3 transition ${
                  equippedItem
                    ? 'bg-[#172033] border-2 border-[#2563EB] shadow-md shadow-[#2563EB]/20'
                    : owned
                    ? 'bg-[#172033] border-[#263449]'
                    : 'bg-[#111827] border-[#263449] opacity-90'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Item Color Preview Pill */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner flex-shrink-0 border border-white/20"
                    style={{ backgroundColor: item.previewBg, color: item.previewAccent }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-[#F8FAFC] text-xs truncate">{item.name}</h4>
                      {equippedItem && (
                        <span className="px-1.5 py-0.2 rounded bg-[#2563EB] text-[#F8FAFC] text-[9px] font-black uppercase tracking-wider">
                          EQUIPPED
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mt-0.5 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#263449] pt-2.5">
                  <div className="flex items-center gap-1">
                    {owned ? (
                      <span className="text-[11px] font-bold text-[#10B981] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Owned
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-[#F59E0B] flex items-center gap-1 font-mono">
                        <Coins className="w-3.5 h-3.5 text-[#F59E0B]" />
                        {item.cost} Coins
                      </span>
                    )}
                  </div>

                  {owned ? (
                    <button
                      onClick={() => onEquipItem(item.type, item.id)}
                      disabled={equippedItem}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        equippedItem
                          ? 'bg-[#080D1A] border border-[#263449] text-[#94A3B8] cursor-default'
                          : 'bg-[#2563EB] hover:bg-[#1d4ed8] text-[#F8FAFC] shadow-md'
                      }`}
                    >
                      {equippedItem ? 'Equipped' : 'Equip'}
                    </button>
                  ) : (
                    <button
                      onClick={() => onPurchaseItem(item)}
                      disabled={!canAfford}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        canAfford
                          ? 'bg-[#F59E0B] hover:bg-[#d97706] text-[#080D1A] shadow-md shadow-[#F59E0B]/20'
                          : 'bg-[#080D1A] border border-[#263449] text-[#64748B] cursor-not-allowed'
                      }`}
                    >
                      {!canAfford && <Lock className="w-3 h-3" />}
                      Buy
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#263449] flex justify-between items-center text-xs text-[#94A3B8]">
          <span>Earn coins by rolling dice, solving challenges, and climbing ladders!</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#172033] hover:bg-[#263449] border border-[#263449] text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
