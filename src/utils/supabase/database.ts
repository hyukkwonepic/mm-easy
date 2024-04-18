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
      admin: {
        Row: {
          created_at: string | null
          id: string
          reported_user_id: string | null
          status: boolean | null
          target_id: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          reported_user_id?: string | null
          status?: boolean | null
          target_id?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          reported_user_id?: string | null
          status?: boolean | null
          target_id?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          post_id: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          post_id: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      game_tries: {
        Row: {
          created_at: string
          id: string
          score: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          score?: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          score?: number
          user_id?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          attached_img_url: string | null
          author_id: string | null
          category: string | null
          content: string
          created_at: string
          deleted_at: string | null
          id: string
          title: string
          view_count: number | null
        }
        Insert: {
          attached_img_url?: string | null
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          title: string
          view_count?: number | null
        }
        Update: {
          attached_img_url?: string | null
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          title?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_img_url: string | null
          email: string
          id: string
          nickname: string
        }
        Insert: {
          avatar_img_url?: string | null
          email: string
          id?: string
          nickname: string
        }
        Update: {
          avatar_img_url?: string | null
          email?: string
          id?: string
          nickname?: string
        }
        Relationships: []
      }
      question_options: {
        Row: {
          content: string
          id: string
          is_answer: boolean
          question_id: string
        }
        Insert: {
          content: string
          id?: string
          is_answer: boolean
          question_id: string
        }
        Update: {
          content?: string
          id?: string
          is_answer?: boolean
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_questions_options_question_id"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          correct_answer: string | null
          id: string
          img_url: string | null
          quiz_id: string
          title: string
          type: string
        }
        Insert: {
          correct_answer?: string | null
          id?: string
          img_url?: string | null
          quiz_id: string
          title: string
          type: string
        }
        Update: {
          correct_answer?: string | null
          id?: string
          img_url?: string | null
          quiz_id?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_questions_quiz_id"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_tries: {
        Row: {
          created_at: string
          id: string
          quiz_id: string
          score: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          quiz_id: string
          score: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          quiz_id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_quiz_tries_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          creator_id: string | null
          deleted_at: string | null
          id: string
          info: string
          level: number
          thumbnail_img_url: string | null
          title: string
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          deleted_at?: string | null
          id?: string
          info: string
          level: number
          thumbnail_img_url?: string | null
          title: string
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          deleted_at?: string | null
          id?: string
          info?: string
          level?: number
          thumbnail_img_url?: string | null
          title?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          admin_id: string
          id: string
          user_id: string
        }
        Insert: {
          admin_id: string
          id?: string
          user_id: string
        }
        Update: {
          admin_id?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_game_tries_with_details: {
        Args: {
          target_date: string
        }
        Returns: {
          score: number
          user_id: string
          nickname: string
          avatar_img_url: string
        }[]
      }
      get_quiz_ranking_with_details: {
        Args: {
          target_date: string
        }
        Returns: {
          email: string
          quiz_count: number
          nickname: string
          avatar_img_url: string
        }[]
      }
      get_quiz_tries_with_details: {
        Args: {
          target_date: string
        }
        Returns: {
          score: number
          user_id: string
          nickname: string
          avatar_img_url: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
