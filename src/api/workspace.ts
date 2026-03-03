import { supabase } from "@/lib/supabaseClient";

export const fetchWorkspaces = async (userId: string) => {
  const { data, error } = await supabase
    .from("workspace")
    .select("*, workspace_member!inner(id, user_id, default_workspace, role)")
    .eq("workspace_member.user_id", userId);

  if (error) throw new Error(error.message);
  return data;
};
