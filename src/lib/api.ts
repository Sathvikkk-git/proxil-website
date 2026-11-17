export interface FormPayload {
  kind: 'waitlist' | 'contact';
  name: string;
  email: string;
  phone?: string;
  message?: string;
  config?: {color: string; size: string; weight: string};
}

export interface SubmitResult {
  /** true only when a real endpoint accepted the submission */
  delivered: boolean;
}

/**
 * BACKEND HOOK — not connected by default.
 * Set VITE_FORM_ENDPOINT (e.g. a Formspree / Basin / your own API URL) in `.env`
 * and submissions are POSTed there as JSON. Without it the forms run in
 * preview mode: nothing leaves the browser and the UI says so.
 */
export async function submitForm(payload: FormPayload): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 600));
    return {delivered: false};
  }
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
  return {delivered: true};
}

export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
