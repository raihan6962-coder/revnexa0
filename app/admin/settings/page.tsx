'use client';

import { useEffect, useState } from 'react';
import { Save, Settings as SettingsIcon, Loader2, Send } from 'lucide-react';
import { getSiteSettings, updateSiteSetting } from '@/lib/chat-db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const contactFields = [
  { key: 'site_name', label: 'Site Name' },
  { key: 'contact_email', label: 'Contact Email' },
  { key: 'whatsapp_number', label: 'WhatsApp Number (with country code, no +)', placeholder: 'e.g. 1234567890' },
  { key: 'telegram_username', label: 'Telegram Username (without @)', placeholder: 'e.g. revnexa' },
  { key: 'discord_url', label: 'Discord Invite URL (leave empty to hide)' },
  { key: 'reply_time_text', label: 'Reply Time Text' },
];

const telegramFields = [
  { key: 'telegram_bot_token', label: 'Telegram Bot Token', placeholder: 'e.g. 123456789:ABCdefGHIjklMNOpqrsTUVwxyz' },
  { key: 'telegram_chat_id', label: 'Telegram Chat ID', placeholder: 'e.g. 123456789' },
];

const seoFields = [
  { key: 'default_meta_title', label: 'Default Meta Title' },
  { key: 'default_meta_description', label: 'Default Meta Description', type: 'textarea' },
];

const allFields = [...contactFields, ...telegramFields, ...seoFields];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    getSiteSettings().then((s) => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  async function save() {
    setSaving(true);
    for (const field of allFields) {
      await updateSiteSetting(field.key, settings[field.key] || '');
    }
    setSaving(false);
    toast({ title: 'Settings saved', description: 'Your changes have been applied.' });
  }

  if (loading) return <p className="py-20 text-center text-muted-foreground">Loading settings...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Site Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage contact info, SEO defaults, and site configuration.</p>
        </div>
        <Button onClick={save} disabled={saving} className="gap-2" size="sm">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-premium">
        <div className="mb-4 flex items-center gap-2">
          <SettingsIcon className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-lg font-semibold text-foreground">Contact & Social</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {contactFields.map((field) => (
            <div key={field.key}>
              <Label htmlFor={field.key}>{field.label}</Label>
              <Input id={field.key} value={settings[field.key] || ''} onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })} placeholder={(field as { placeholder?: string }).placeholder || ''} className="mt-1.5" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-premium">
        <div className="mb-4 flex items-center gap-2">
          <Send className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-lg font-semibold text-foreground">Telegram Notifications</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          When a new inquiry comes in, a notification is sent to your Telegram. Enter your bot token and chat ID here.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {telegramFields.map((field) => (
            <div key={field.key}>
              <Label htmlFor={field.key}>{field.label}</Label>
              <Input id={field.key} value={settings[field.key] || ''} onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })} placeholder={(field as { placeholder?: string }).placeholder || ''} className="mt-1.5" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-premium">
        <div className="mb-4 flex items-center gap-2">
          <SettingsIcon className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-lg font-semibold text-foreground">SEO Defaults</h2>
        </div>
        <div className="space-y-4">
          {seoFields.map((field) => (
            <div key={field.key}>
              <Label htmlFor={field.key}>{field.label}</Label>
              {field.type === 'textarea' ? (
                <Textarea id={field.key} value={settings[field.key] || ''} onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })} className="mt-1.5" rows={3} />
              ) : (
                <Input id={field.key} value={settings[field.key] || ''} onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })} className="mt-1.5" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving} className="gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
}
