import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xwahjyzlvsofxtflxeaa.supabase.co';
const supabaseKey = 'sb_publishable_9D7uDi2k6cNXC4a1gOaf3w_Z1VgfAkZ';

export const supabase = createClient(supabaseUrl, supabaseKey);