export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      campains: {
        Row: {
          created_at: string
          id: string
          name: string
          status: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      players: {
        Row: {
          campain_id: string
          created_at: string
          exp: number | null
          id: string
          level: number | null
          name: string
          playCount: number | null
          playToken: number | null
        }
        Insert: {
          campain_id: string
          created_at?: string
          exp?: number | null
          id?: string
          level?: number | null
          name: string
          playCount?: number | null
          playToken?: number | null
        }
        Update: {
          campain_id?: string
          created_at?: string
          exp?: number | null
          id?: string
          level?: number | null
          name?: string
          playCount?: number | null
          playToken?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "players_campain_id_fkey"
            columns: ["campain_id"]
            isOneToOne: false
            referencedRelation: "campains"
            referencedColumns: ["id"]
          }
        ]
      }
      sessions: {
        Row: {
          campain_id: string
          created_at: string
          exp: number | null
          gm: string | null
          id: string
          name: string
          number: number
        }
        Insert: {
          campain_id: string
          created_at?: string
          exp?: number | null
          gm?: string | null
          id?: string
          name: string
          number: number
        }
        Update: {
          campain_id?: string
          created_at?: string
          exp?: number | null
          gm?: string | null
          id?: string
          name?: string
          number?: number
        }
        Relationships: [
          {
            foreignKeyName: "sessions_campain_id_fkey"
            columns: ["campain_id"]
            isOneToOne: false
            referencedRelation: "campains"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
