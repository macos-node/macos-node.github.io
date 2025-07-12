
import React, { useState, useEffect } from 'react';
import { Bitcoin, RefreshCw, TrendingUp, DollarSign, Moon, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import axios from 'axios';

interface CurrencyRate {
  symbol: string;
  name: string;
  rate: number;
  satoshisPerUnit: number;
  flag: string;
}

const BitcoinConverter = () => {
  const { theme, toggleTheme } = useTheme();
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currencies = [
    { symbol: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { symbol: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { symbol: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { symbol: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { symbol: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { symbol: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
    { symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
    { symbol: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' }
  ];

  const fetchBitcoinRates = async () => {
    try {
      setError(null);
      console.log('Fetching Bitcoin rates...');
      
      // Using CoinGecko API (free, no API key required)
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,gbp,jpy,cad,aud,chf,cny'
      );
      
      console.log('API Response:', response.data);
      
      const bitcoinPrices = response.data.bitcoin;
      const SATOSHIS_PER_BITCOIN = 100000000; // 100 million satoshis = 1 Bitcoin
      
      const newRates: CurrencyRate[] = currencies.map(currency => {
        const price = bitcoinPrices[currency.symbol.toLowerCase()];
        const satoshisPerUnit = price ? Math.round(SATOSHIS_PER_BITCOIN / price) : 0;
        
        return {
          symbol: currency.symbol,
          name: currency.name,
          rate: price || 0,
          satoshisPerUnit,
          flag: currency.flag
        };
      });
      
      setRates(newRates);
      setLastUpdated(new Date());
      console.log('Rates updated successfully');
    } catch (err) {
      console.error('Error fetching Bitcoin rates:', err);
      setError('Failed to fetch current rates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBitcoinRates();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchBitcoinRates, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: currency === 'JPY' ? 0 : 2
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 pt-4">
          <div className="flex items-center justify-center mb-3">
            <Bitcoin className="h-10 w-10 text-orange-500 mr-3" />
            <h1 className="text-3xl font-bold text-foreground">Satoshi Converter</h1>
          </div>
          <p className="text-muted-foreground text-base">
            Real-time Bitcoin conversion rates in satoshis per currency unit
          </p>
          {lastUpdated && (
            <p className="text-muted-foreground text-sm mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <Button
            onClick={fetchBitcoinRates}
            disabled={loading}
            variant="default"
            size="sm"
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Updating...' : 'Refresh'}
          </Button>
          
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="sm"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive p-3 rounded-lg mb-4 text-center text-sm">
            {error}
          </div>
        )}

        {/* Currency Grid - More Compact */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {rates.map((rate) => (
            <Card key={rate.symbol} className="bg-card border-border hover:border-orange-500/50 transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="flex items-center justify-between text-foreground text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{rate.flag}</span>
                    <span className="font-mono font-bold text-sm">{rate.symbol}</span>
                  </div>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-3 pb-3">
                <div>
                  <p className="text-muted-foreground text-xs">{rate.name}</p>
                  <p className="text-foreground text-sm font-mono">
                    {rate.rate > 0 ? formatPrice(rate.rate, rate.symbol) : 'Loading...'}
                  </p>
                </div>
                
                <div className="border-t border-border pt-2">
                  <p className="text-orange-500 text-lg font-bold font-mono">
                    {rate.satoshisPerUnit > 0 
                      ? (
                          <>
                            <span className="text-xl font-extrabold">{formatNumber(rate.satoshisPerUnit)}</span>
                            {' Sats per '}
                            {rate.symbol}
                          </>
                        )
                      : 'Loading...'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-8 text-center">
          <Card className="bg-card/50 border-border max-w-2xl mx-auto">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-3">
                <DollarSign className="h-5 w-5 text-orange-500 mr-2" />
                <h3 className="text-lg font-semibold text-foreground">What are Satoshis?</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A satoshi is the smallest unit of Bitcoin, named after its creator Satoshi Nakamoto. 
                One Bitcoin equals 100,000,000 satoshis. This converter shows how many satoshis 
                you can get for one unit of each major currency, making it easier to understand 
                Bitcoin's purchasing power in familiar terms.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-muted-foreground text-xs pb-6">
          <p>Data provided by CoinGecko API • Updates every 30 seconds</p>
        </footer>
      </div>
    </div>
  );
};

export default BitcoinConverter;
